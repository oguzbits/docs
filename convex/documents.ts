import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";

import { mutation, query } from "./_generated/server";

const DOCUMENTS_TABLE = "documents";

export const create = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, { initialContent, title }) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) throw new ConvexError("Unauthorized!");

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    const documentId = await ctx.db.insert(DOCUMENTS_TABLE, {
      title: title ?? "Untitled Document",
      ownerId: user.subject,
      organizationId,
      initialContent: initialContent ?? "",
    });

    return documentId;
  },
});

export const get = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  },
  handler: async (ctx, { search, paginationOpts }) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) throw new ConvexError("Unauthorized!");

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    // search within organization
    if (search && organizationId) {
      return await ctx.db
        .query(DOCUMENTS_TABLE)
        .withSearchIndex("search_title", (q) =>
          q.search("title", search).eq("organizationId", organizationId),
        )
        .paginate(paginationOpts);
    }

    // search within personal
    if (search) {
      return await ctx.db
        .query(DOCUMENTS_TABLE)
        .withSearchIndex("search_title", (q) =>
          q.search("title", search).eq("ownerId", user.subject),
        )
        .paginate(paginationOpts);
    }

    // all organization docs
    if (organizationId) {
      return await ctx.db
        .query(DOCUMENTS_TABLE)
        .withIndex("by_organization_id", (q) =>
          q.eq("organizationId", organizationId),
        )
        .paginate(paginationOpts);
    }

    // all personal docs
    return await ctx.db
      .query(DOCUMENTS_TABLE)
      .withIndex("by_owner_id", (q) => q.eq("ownerId", user.subject))
      .paginate(paginationOpts);
  },
});

export const getByIds = query({
  args: { ids: v.array(v.id(DOCUMENTS_TABLE)) },
  handler: async (ctx, { ids }) => {
    const documents = await Promise.all(
      ids.map((id) => ctx.db.get(id))
    );

    return documents.map((document, index) => {
      if (document) {
        return { id: document._id, name: document.title };
      } else {
        return { id: ids[index], name: "[Removed]" };
      }
    });
  },
});

export const getById = query({
  args: { id: v.id(DOCUMENTS_TABLE) },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const removeById = mutation({
  args: { id: v.id(DOCUMENTS_TABLE) },
  handler: async (ctx, { id }) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) throw new ConvexError("Unauthorized!");

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;
    const document = await ctx.db.get(id);
    if (!document) throw new ConvexError("Document not found!");

    const isOwner = document.ownerId === user.subject;
    const isOrganizationMember = !!(
      document.organizationId && document.organizationId === organizationId
    );
    if (!isOwner && !isOrganizationMember)
      throw new ConvexError("Unauthorized!");

    await ctx.db.delete(id);

    return id;
  },
});

export const updateById = mutation({
  args: { id: v.id(DOCUMENTS_TABLE), title: v.string() },
  handler: async (ctx, { id, title }) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) throw new ConvexError("Unauthorized!");

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;
    const document = await ctx.db.get(id);
    if (!document) throw new ConvexError("Document not found!");

    const isOwner = document.ownerId === user.subject;
    const isOrganizationMember = !!(
      document.organizationId && document.organizationId === organizationId
    );
    if (!isOwner && !isOrganizationMember)
      throw new ConvexError("Unauthorized!");

    await ctx.db.patch(id, { title });

    return id;
  },
});
