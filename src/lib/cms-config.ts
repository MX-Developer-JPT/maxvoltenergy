// Shared, framework-agnostic configuration for the admin CMS.
// Imported by both the client (EntityManager UI) and server (API validation).
// Pure data — no `fs`, no JSX.

export type CmsFieldType =
  | "text" | "textarea" | "number" | "date" | "toggle" | "select" | "image" | "url";

export interface CmsField {
  key: string;
  label: string;
  type: CmsFieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  help?: string;
  full?: boolean; // span both columns in the form grid
}

export type CmsColumnType =
  | "text" | "link" | "toggle" | "order" | "meta" | "date" | "badge" | "image";

export interface CmsColumn {
  key: string;
  label: string;
  type: CmsColumnType;
  /** For `link` columns: href = linkBase + row[key]. */
  linkBase?: string;
  /** For `meta` columns: which field's presence flips the indicator. */
  metaSource?: string;
}

export interface CmsEntity {
  collection: string;
  label: string;       // sidebar / page title  → "Manage Products"
  singular: string;    // "Add New {singular}"   → "Product"
  titleKey: string;    // which field is the row's display name
  columns: CmsColumn[];
  fields: CmsField[];
}

const ENABLED_COL: CmsColumn = { key: "enabled", label: "Enabled", type: "toggle" };
const ORDER_COL: CmsColumn = { key: "order", label: "Order", type: "order" };
const META_COL: CmsColumn = { key: "meta", label: "Meta", type: "meta", metaSource: "metaTitle" };
const INDEX_COL: CmsColumn = { key: "indexFollow", label: "Index,Follow", type: "toggle" };

// SEO fields reused across content entities
const SEO_FIELDS: CmsField[] = [
  { key: "metaTitle", label: "Meta Title", type: "text", placeholder: "SEO meta title", full: true },
  { key: "metaDescription", label: "Meta Description", type: "textarea", placeholder: "SEO meta description", full: true },
  { key: "indexFollow", label: "Index & Follow (allow search engines)", type: "toggle" },
];

export const CMS_ENTITIES: Record<string, CmsEntity> = {
  "home-sections": {
    collection: "home-sections",
    label: "Manage Home Page",
    singular: "Section",
    titleKey: "name",
    columns: [
      { key: "name", label: "Section Name", type: "text" },
      ORDER_COL,
      ENABLED_COL,
    ],
    fields: [
      { key: "name", label: "Section Name", type: "text", required: true, full: true, placeholder: "e.g. Banners Section" },
      { key: "order", label: "Order", type: "number" },
      { key: "enabled", label: "Enabled (visible on the home page)", type: "toggle" },
    ],
  },

  products: {
    collection: "products",
    label: "Manage Products",
    singular: "Product",
    titleKey: "name",
    columns: [
      { key: "name", label: "Product Name", type: "text" },
      { key: "category", label: "Category", type: "link", linkBase: "/products" },
      META_COL,
      INDEX_COL,
      ORDER_COL,
      { key: "owop", label: "OWOP", type: "toggle" },
      ENABLED_COL,
    ],
    fields: [
      { key: "name", label: "Product Name", type: "text", required: true, full: true },
      { key: "slug", label: "Page URL (slug)", type: "text", placeholder: "e-cycle-lithium-battery", full: true },
      { key: "category", label: "Category", type: "text", placeholder: "Products" },
      { key: "order", label: "Order", type: "number" },
      { key: "owop", label: "Open With One Page (OWOP)", type: "toggle" },
      ...SEO_FIELDS,
      { key: "enabled", label: "Enabled", type: "toggle" },
    ],
  },

  "media-coverage": {
    collection: "media-coverage",
    label: "Manage Media Coverage",
    singular: "Media Coverage",
    titleKey: "title",
    columns: [
      { key: "title", label: "Media Coverage Title", type: "text" },
      { key: "pageUrl", label: "Page URL", type: "link", linkBase: "/press-release" },
      { key: "publishDate", label: "Publish Date", type: "date" },
      META_COL,
      INDEX_COL,
      ENABLED_COL,
    ],
    fields: [
      { key: "title", label: "Title", type: "text", required: true, full: true },
      { key: "pageUrl", label: "Page URL (slug)", type: "text", full: true },
      { key: "publishDate", label: "Publish Date", type: "date" },
      { key: "source", label: "Source / Publication", type: "text" },
      { key: "sourceUrl", label: "Source URL", type: "url", full: true },
      { key: "excerpt", label: "Excerpt", type: "textarea", full: true },
      ...SEO_FIELDS,
      { key: "enabled", label: "Enabled", type: "toggle" },
    ],
  },

  banners: {
    collection: "banners",
    label: "Manage Banners",
    singular: "Banner",
    titleKey: "title",
    columns: [
      { key: "image", label: "Image", type: "image" },
      { key: "title", label: "Title", type: "text" },
      ORDER_COL,
      ENABLED_COL,
    ],
    fields: [
      { key: "title", label: "Title", type: "text", required: true, full: true },
      { key: "subtitle", label: "Subtitle", type: "text", full: true },
      { key: "image", label: "Image URL", type: "image", full: true, placeholder: "/images/banner/...webp" },
      { key: "link", label: "Button Link", type: "url", full: true },
      { key: "order", label: "Order", type: "number" },
      { key: "enabled", label: "Enabled", type: "toggle" },
    ],
  },

  certificates: {
    collection: "certificates",
    label: "Manage Certificates",
    singular: "Certificate",
    titleKey: "name",
    columns: [
      { key: "image", label: "Image", type: "image" },
      { key: "name", label: "Certificate Name", type: "text" },
      { key: "year", label: "Year", type: "badge" },
      ORDER_COL,
      ENABLED_COL,
    ],
    fields: [
      { key: "name", label: "Certificate Name", type: "text", required: true, full: true },
      { key: "issuer", label: "Issuing Authority", type: "text", full: true },
      { key: "image", label: "Image URL", type: "image", full: true },
      { key: "year", label: "Year / Validity", type: "text" },
      { key: "order", label: "Order", type: "number" },
      { key: "description", label: "Description", type: "textarea", full: true },
      { key: "enabled", label: "Enabled", type: "toggle" },
    ],
  },

  clients: {
    collection: "clients",
    label: "Manage Clients",
    singular: "Client",
    titleKey: "name",
    columns: [
      { key: "logo", label: "Logo", type: "image" },
      { key: "name", label: "Client Name", type: "text" },
      ORDER_COL,
      ENABLED_COL,
    ],
    fields: [
      { key: "name", label: "Client Name", type: "text", required: true, full: true },
      { key: "logo", label: "Logo URL", type: "image", full: true, placeholder: "/images/brand/...webp" },
      { key: "website", label: "Website", type: "url", full: true },
      { key: "order", label: "Order", type: "number" },
      { key: "enabled", label: "Enabled", type: "toggle" },
    ],
  },

  gallery: {
    collection: "gallery",
    label: "Manage Gallery",
    singular: "Gallery Image",
    titleKey: "title",
    columns: [
      { key: "image", label: "Image", type: "image" },
      { key: "title", label: "Title", type: "text" },
      ORDER_COL,
      ENABLED_COL,
    ],
    fields: [
      { key: "title", label: "Title / Caption", type: "text", required: true, full: true },
      { key: "image", label: "Image URL", type: "image", full: true, placeholder: "/images/gallery/...webp" },
      { key: "order", label: "Order", type: "number" },
      { key: "enabled", label: "Enabled", type: "toggle" },
    ],
  },

  testimonials: {
    collection: "testimonials",
    label: "Manage Testimonials",
    singular: "Testimonial",
    titleKey: "name",
    columns: [
      { key: "name", label: "Name", type: "text" },
      { key: "role", label: "Role", type: "text" },
      { key: "rating", label: "Rating", type: "badge" },
      ORDER_COL,
      ENABLED_COL,
    ],
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "role", label: "Role / Company", type: "text" },
      { key: "content", label: "Testimonial", type: "textarea", required: true, full: true },
      { key: "rating", label: "Rating", type: "select", options: ["5", "4", "3", "2", "1"] },
      { key: "order", label: "Order", type: "number" },
      { key: "enabled", label: "Enabled", type: "toggle" },
    ],
  },

  team: {
    collection: "team",
    label: "Manage Our Team",
    singular: "Team Member",
    titleKey: "name",
    columns: [
      { key: "image", label: "Photo", type: "image" },
      { key: "name", label: "Name", type: "text" },
      { key: "designation", label: "Designation", type: "text" },
      ORDER_COL,
      ENABLED_COL,
    ],
    fields: [
      { key: "name", label: "Name", type: "text", required: true, full: true },
      { key: "role", label: "Role", type: "text", full: true },
      { key: "designation", label: "Designation", type: "text", full: true },
      { key: "image", label: "Photo URL", type: "image", full: true, placeholder: "/images/our-team/...webp" },
      { key: "order", label: "Order", type: "number" },
      { key: "enabled", label: "Enabled", type: "toggle" },
    ],
  },

  policies: {
    collection: "policies",
    label: "Manage Policies",
    singular: "Policy",
    titleKey: "title",
    columns: [
      { key: "title", label: "Policy Title", type: "text" },
      { key: "fileUrl", label: "Document", type: "link" },
      ORDER_COL,
      ENABLED_COL,
    ],
    fields: [
      { key: "title", label: "Policy Title", type: "text", required: true, full: true },
      { key: "fileUrl", label: "Document URL (PDF)", type: "url", full: true, placeholder: "/assets/docs/policy/...pdf" },
      { key: "order", label: "Order", type: "number" },
      { key: "enabled", label: "Enabled", type: "toggle" },
    ],
  },

  locations: {
    collection: "locations",
    label: "Manage Office Locations",
    singular: "Office Location",
    titleKey: "name",
    columns: [
      { key: "name", label: "Location", type: "text" },
      { key: "address", label: "Address", type: "text" },
      ORDER_COL,
      ENABLED_COL,
    ],
    fields: [
      { key: "name", label: "Location Name", type: "text", required: true, full: true },
      { key: "address", label: "Address", type: "textarea", full: true },
      { key: "city", label: "City", type: "text" },
      { key: "state", label: "State", type: "text" },
      { key: "mapUrl", label: "Google Maps URL", type: "url", full: true },
      { key: "phone", label: "Phone", type: "text" },
      { key: "order", label: "Order", type: "number" },
      { key: "enabled", label: "Enabled", type: "toggle" },
    ],
  },
};

export const CMS_COLLECTIONS = Object.keys(CMS_ENTITIES);

export function getEntity(collection: string): CmsEntity | undefined {
  return CMS_ENTITIES[collection];
}
