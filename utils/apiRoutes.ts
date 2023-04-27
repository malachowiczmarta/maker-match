import axios from "axios";

const httpClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

const apiRoutes = {
  profiles: {
    like: (payload: any) => httpClient.post("/api/profiles", payload),
    skip: (payload: any) =>
      httpClient({ url: "/api/profiles", data: payload, method: "DELETE" }),
  },
  user: {
    filter: {
      update: (payload: any) => httpClient.put("/api/user/filter", payload),
    },
    profile: {
      get: () => httpClient.get("/api/user/profile"),
      update: (payload: any) => httpClient.put("/api/user/profile", payload),
    },
  },
  conversations: {
    message: {
      create: (id: string, payload: any) =>
        httpClient.post(`/api/conversations/${id}`, payload),
    },
  },
  fetcher: (url: string) => httpClient.get(url).then((res) => res.data),
};

export default apiRoutes;
