const {createClient} = supabase
const supabaseUrl = 'https://rbrkysysjgrzneiwyrsr.supabase.co'
const supabaseClient = createClient(supabaseUrl, supabaseKey)
window.supabase = supabaseClient
