// API response types
export interface ApiResponse {
    success: boolean
    message: string
    [key: string]: any
  }
  
  // Contact form data type
  export interface ContactFormData {
    name: string
    email: string
    subject: string
    message: string
  }
  