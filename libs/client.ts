import { createClient } from 'microcms-js-sdk';
import type { Food } from '@/src/types/food';

if (!process.env.SERVICE_DOMAIN) {
    throw new Error("SERVICE_DOMAIN is required");
}

if (!process.env.API_KEY) {
    throw new Error("API_KEY is required");
}

export const client = createClient({
    serviceDomain: process.env.SERVICE_DOMAIN,
    apiKey: process.env.API_KEY,
});

// ご飯一覧を取得
export const getFoods = async (params?: { type?: string; q?: string }) => {
    const filters = params?.type ? `type[contains]${params.type}` : undefined;

    const foods = await client.getList<Food>({
        endpoint: "food",
        queries: {
            filters,
            q: params?.q || undefined,
        },
    });
    return foods;
}

// ご飯の詳細を取得
export const getDetail = async (contentId: string) => {
    const food = await client.getListDetail<Food>({
        endpoint: "food",
        contentId,
        customRequestInit: { cache: "no-store" },
    });
    return food;
};


