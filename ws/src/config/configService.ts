import { z } from "zod";

export default ()=>({
    PORT:z.coerce.number().default(5000),
    DATABASE_URL:z.string().min(1,"Database url is required")
})