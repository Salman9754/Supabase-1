const {createClient} = supabase
const supabaseUrl = 'https://rbrkysysjgrzneiwyrsr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJicmt5c3lzamdyem5laXd5cnNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2NjM1ODIsImV4cCI6MjA1MjIzOTU4Mn0.Mqg1Bq2wIM-nZx003p9vKoNpbFG1k2sAdrahSIuHeyE'
const supabaseClient = createClient(supabaseUrl, supabaseKey)
window.supabase = supabaseClient
