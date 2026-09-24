import {ENV} from '../config.js'
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

export const mySupabase = createClient(ENV.SUPABASE_URL,ENV.SUPABASE_ANON)

// ==========================================
// 7. DATABASE FETCH UTILITY
// ==========================================
// Async function that queries Supabase using table name, key-value filters, and optional column selections.
export const fetchFunction = async (table, filterKey, filterValue, selection = "*", filterKey2, filterValue2) => {
    let query = mySupabase
        .from(table)
        .select(selection)
        .eq(filterKey, filterValue)

    if (filterKey2 !== undefined && filterValue2 !== undefined) {
        query = query.eq(filterKey2, filterValue2)
    }

    const {data, error} = await query

    // Log errors safely and return an empty array to prevent code breakage downstream
    if(error){
        console.log("cannot try because " + error.message)
        return [] 
    }

    // Extract single column attributes into a simplified array if a specific column is requested
    if(data && selection != "*"){ 
        let arrayData = [];

        data.forEach(function(item){
            let entry = item[selection]
            if(entry) arrayData.push(entry)
        })
        return arrayData
    }

    // Return the raw data array or an empty array fallback
    return data || []
}