import { createClient } from 'microcms-js-sdk';

export type Blog = {
    id: string;
    title: string;
    body: string;   
}

if (!process.env.SERVICE_DOMAIN) {
    throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.API_KEY) {
    throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

export const client = createClient({
    serviceDomain: process.env.SERVICE_DOMAIN,
    apiKey: process.env.API_KEY,
});

// ご飯一覧を取得
export const getFoods = async () => {
    const foods = await client.getList<Blog>({
    endpoint: "food"
    });
    return foods;
}

// ご飯の詳細を取得
export const getDetail = async (contentId: string) => {
    const food = await client.getListDetail<Blog>({
        endpoint: "food",
        contentId,
    });
    return food;
};


