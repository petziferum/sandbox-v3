class ApiError extends Error {
  public readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.stack = new Error().stack;
    this.message = message;
  }
}

export default class FetchUtils {
  static getGETConfig(signal?: AbortSignal): RequestInit {
    return {
      headers: this.getHeaders(),
      mode: "cors",
      redirect: "manual",
      signal: signal,
    };
  }

  static getPOSTConfig(body: any, signal?: AbortSignal): RequestInit {
    return {
      body: JSON.stringify(body),
      headers: this.getHeaders(),
      method: "POST",
      mode: "cors",
      redirect: "manual",
      credentials: "same-origin",
      signal: signal,
    };
  }

  static getPUTConfig(body: any, signal?: AbortSignal): RequestInit {
    const headers = this.getHeaders();
    if(body.version) {
      headers.append("If-Match", body.version);
    }
    return {
        body: JSON.stringify(body),
        headers: headers,
        method: "PUT",
        mode: "cors",
        redirect: "manual",
        credentials: "same-origin",
        signal: signal,
    }
  }

  static getDELETEConfig(): RequestInit {
    return {
        headers: this.getHeaders(),
        method: "DELETE",
        mode: "cors",
        redirect: "manual",
        credentials: "same-origin",
    }
  }

  private static getHeaders() {
    const headers = new Headers({
      "Content-Type": "application/json",
    });
    const csrfCookie = this._getXSRFToken();
    if(csrfCookie) {
      headers.append("X-XSRF-TOKEN", csrfCookie);
    }
    return headers;
  }

  private static _getXSRFToken() {
    const help = document.cookie.match(new RegExp("(^|;)\\s*" + "XSRF-TOKEN" + "\\s*=\\s*([^;]+)"));
    return (help ? help.pop() : "") as string;
  }

  static async defaultResponseHandler(response: Response, errorMessage?: string): Promise<void> {
    if (!response.ok) {
        if (response.type === 'opaqueredirect') {
            location.reload();
        }
        return await response.json().then((error) => {
            throw new ApiError(error.message, response.status);
        });
    }
  }
}
