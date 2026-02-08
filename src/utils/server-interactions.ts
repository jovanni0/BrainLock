import { useGeneralSettings } from "../stores/general-settings-store";
import type { Quiz, QuizMetadata } from "../types/quiz-types";
import axios from "axios";


function getBaseApiUrl() 
{
    const url = useGeneralSettings.getState().api_url
    const clean_url = url.endsWith('/') ? url.slice(0, -1) : url

    return clean_url
}


/**
 * fetches the quiz specified by hash.
 * @param hash the hash of the quiz.
 * @returns the quiz object or `null` in case of error.
 */
export async function fetchQuizFromApi(hash: string): Promise<Quiz | null | undefined>
{
    const base_api_url = getBaseApiUrl()
    
    if (base_api_url === "")
    {
        return undefined
    }

    const res = await axios.get(`${base_api_url}/api/quiz/${hash}`);
    return res.data;
}


/**
 * fetches all the metadata from the server.
 * @returns the metadata.
 */
export async function fetchMetadataFromApi(): Promise<QuizMetadata[] | undefined>
{
    const base_api_url = getBaseApiUrl()

    if (base_api_url === "")
    {
        return undefined
    }
    
    const res = await axios.get(`${base_api_url}/api/metadata`);
    return res.data.quizzes;
}