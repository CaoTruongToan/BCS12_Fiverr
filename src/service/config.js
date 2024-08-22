import axios from "axios";

// NV1 : Coi và setup lại một axios custom xử lí gọi API cho dự án Fiverr
export const http = axios.create({
  baseURL: "https://fiverrnew.cybersoft.edu.vn/api",
  timeout: 30000,
  headers: {
    tokenCyberSoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2OSIsIkhldEhhblN0cmluZyI6IjMxLzAxLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTczODI4MTYwMDAwMCIsIm5iZiI6MTcxMDUyMjAwMCwiZXhwIjoxNzM4NDI5MjAwfQ.bsAaudu2iAsJe1QzbsWWy0HG7ofC_8rFKL-MG_jW1ig",
  },
});
