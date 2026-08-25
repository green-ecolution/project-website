import ContentLink from './ContentLink.astro'
import ContentTable from './ContentTable.astro'

// Everything else is styled by .content-body in css. These two need to change
// the markup: the link to carry the language, the table to gain a scroll box.
export const contentComponents = { a: ContentLink, table: ContentTable }
