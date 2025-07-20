import type { JiraResponse } from "../types/global";

const callAndHandleError = async <T>({
  apiCall,
  isResponseAvailable,
}: {
  apiCall: Promise<Response>;
  isResponseAvailable: boolean;
}): Promise<JiraResponse<T>> => {
  try {
    const response = await apiCall;

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: response.statusText };
      }
      return {
        success: false,
        error: errorData,
        status: response.status,
      };
    }

    const data = (isResponseAvailable ? await response.json() : undefined) as T;
    return {
      success: true,
      data,
      status: response.status,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred",
      status: 0,
    };
  }
};

export default callAndHandleError;
