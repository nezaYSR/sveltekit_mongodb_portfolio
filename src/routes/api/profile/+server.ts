import { json } from '@sveltejs/kit';
import type { Profile } from '../model';
import { get_profile, post_profile } from '../controller'
import { validateProfileFields } from '../validation';

export const GET = async () => {
    try {
        const data = await get_profile()
        return json({
            statusCode: 200,
            message: "Data fetched successfully!",
            status: "success",
            data: data,
        })
    } catch (error: unknown) {
        let errorMessage = 'Unknown error';
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return json({
            statusCode: 500,
            message: errorMessage,
            status: "error"
        })
    }
}

export const POST = async (requestEvent) => {
    try {
        const { request } = requestEvent
        const body = await request.json();

        const isValid = validateProfileFields(body)

        if (!isValid) {
            return json({
                statusCode: 400,
                message: "Invalid input data: Please provide valid data for all fields",
                status: "failed",
            })
        }

        const data: Profile = body
        const result = await post_profile(data)

        return json({
            statusCode: 200,
            message: "Data posted successfully!",
            status: "success",
            data: result,
        })
    } catch (error: unknown) {
        let errorMessage = 'Unknown error';
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return json({
            statusCode: 500,
            message: errorMessage,
            status: "error"
        })
    }
}