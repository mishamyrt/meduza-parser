export const pageConfig = (page: number) => ({
  params: {
    chrono: 'news',
    locale: 'ru',
    per_page: 24,
    page
  }
})
