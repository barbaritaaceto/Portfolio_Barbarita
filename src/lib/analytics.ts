// ─── Centralized GA4 Analytics Layer ─────────────────────────────────────────
// All events go through this file. Avoids scattered gtag calls.
// Safe-by-default: won't throw if GA isn't loaded.

declare function gtag(...args: unknown[]): void

type GTagParams = Record<string, string | number | boolean | undefined>

export function trackEvent(eventName: string, params?: GTagParams): void {
  try {
    if (typeof window === 'undefined') return
    if (typeof gtag !== 'function') return
    gtag('event', eventName, params ?? {})
  } catch {
    // Never break the app because of analytics
  }
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export const track = {
  pageView(page_path: string, page_title: string, language: string) {
    trackEvent('page_view_custom', { page_path, page_title, language })
  },

  // ─── Hero ────────────────────────────────────────────────────────────────────
  heroView() {
    trackEvent('hero_view')
  },
  clickViewProjects(source_section = 'hero') {
    trackEvent('click_view_projects', { source_section })
  },
  clickContact(source_section = 'hero') {
    trackEvent('click_contact', { source_section })
  },
  clickDownloadCV(source_section = 'hero', file_name = 'CV - Aceto Barbara.png') {
    trackEvent('click_download_cv', { source_section, file_name })
    trackEvent('cv_download_started', { source_section, file_name })
  },

  // ─── Navigation / Scroll ──────────────────────────────────────────────────────
  clickScrollToSection(target_section: string) {
    trackEvent('click_scroll_to_section', { target_section })
  },
  sectionView(section_name: string, scroll_depth?: number) {
    trackEvent('section_view', { section_name, ...(scroll_depth !== undefined && { scroll_depth }) })
  },

  // ─── Scroll depth ─────────────────────────────────────────────────────────────
  scrollDepth(depth: 25 | 50 | 75 | 90) {
    trackEvent(`scroll_${depth}`, { depth })
  },

  // ─── "How I Work" steps ───────────────────────────────────────────────────────
  workStepView(step: 'discovery' | 'hypothesis' | 'delivery' | 'learning_loop') {
    trackEvent(`${step}_view`)
  },

  // ─── Content cards (news / press) ─────────────────────────────────────────────
  clickContentCard(content_title: string, content_type: string, destination_url: string, source_section: string) {
    trackEvent('click_content_card', { content_title, content_type, destination_url, source_section })
  },

  // ─── External links ───────────────────────────────────────────────────────────
  clickExternalLink(link_text: string, destination_url: string, source_section: string) {
    trackEvent('click_external_link', { link_text, destination_url, source_section })
  },

  // ─── Projects ─────────────────────────────────────────────────────────────────
  projectCardView(project_name: string, project_year: number, project_company: string, source_section = 'projects') {
    trackEvent('project_card_view', { project_name, project_year, project_company, source_section })
  },
  clickProjectCard(project_name: string, project_year: number, project_company: string, source_section = 'projects') {
    trackEvent('click_project_card', { project_name, project_year, project_company, source_section })
  },
  expandProjectDetail(project_name: string, project_company: string) {
    trackEvent('expand_project_detail', { project_name, project_company })
  },
  clickProjectCTA(project_name: string, project_company: string, destination_url: string) {
    trackEvent('click_project_cta', { project_name, project_company, destination_url })
  },

  // ─── Contact modal ────────────────────────────────────────────────────────────
  openContactModal(source_section = 'hero') {
    trackEvent('open_contact_modal', { source_section })
  },
  closeContactModal() {
    trackEvent('close_contact_modal')
  },
  clickContactOption(contact_type: 'email' | 'linkedin' | 'whatsapp' | 'calendly' | 'other', source_section = 'contact_modal') {
    trackEvent('click_contact_option', { contact_type, source_section })
  },

  // ─── Language ─────────────────────────────────────────────────────────────────
  changeLanguage(from_language: 'es' | 'en', to_language: 'es' | 'en') {
    trackEvent('change_language', { from_language, to_language })
  },

  // ─── AI Assistant ─────────────────────────────────────────────────────────────
  openAIAssistant(source_section = 'floating_button') {
    trackEvent('open_ai_assistant', { source_section })
  },
  closeAIAssistant() {
    trackEvent('close_ai_assistant')
  },
  aiQuestionSent(question_length: number, language: string, source_section = 'ai_assistant') {
    trackEvent('ai_question_sent', { question_length, language, source_section })
  },
  aiSuggestedQuestionClick(question_length: number, language: string) {
    trackEvent('ai_suggested_question_click', { question_length, language })
  },
  aiResponseReceived(intent_id: string | undefined, language: string) {
    trackEvent('ai_response_received', { question_type: intent_id ?? 'unknown', language })
  },
  aiError() {
    trackEvent('ai_error')
  },

  // ─── Feedback ─────────────────────────────────────────────────────────────────
  openFeedback() {
    trackEvent('open_feedback')
  },
  closeFeedback() {
    trackEvent('close_feedback')
  },
  submitFeedback(feedback_comment_submitted: boolean) {
    trackEvent('submit_feedback', { feedback_comment_submitted })
  },
}
