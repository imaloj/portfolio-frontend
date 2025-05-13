import type { ContactFormData, ApiResponse} from "../types/api"

// Get the API URL from environment variables or use default
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

export async function submitContactForm(data: ContactFormData): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_URL}/contact`,// Send data to the backend 
      {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials:"include",
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      // Handle HTTP errors
      return {
        success: false,
        message: `Server Error : ${response.status} ${response.statusText}`,
      }
    }
    else{
      return{
        success:true,
        message: 'Email send sucessfully'
      }
    }

    return await response.json()
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred"
    console.error("Error submitting contact form:", message)
    return {
      success: false,
      message: "Failed to submit form. Please try again later.",
    }
  }
  
}

/**
 * Get the CV download URL
 */
export function getCVDownloadUrl(): string {
  return "/assets/Aloj_Oli_CV.pdf"
}
