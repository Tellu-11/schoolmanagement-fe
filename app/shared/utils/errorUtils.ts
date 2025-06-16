export const handleError = (error: Error): string => {
  if (error && error.message.includes("Unauthorized")) {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    console.log("aku di siniiiii");
    return error.message;
  } else if (error.message.includes("JDBC")) {
    return "Database connection error. Please try again later.";
  } else if (error.message.includes("xxxx")) {
    // bisa dipake buat error custom lainnya, misalnya bad request
    return error.message;
  } else {
    // For any other type, return a generic error message
    return "An unexpected error occurred.";
  }
};
