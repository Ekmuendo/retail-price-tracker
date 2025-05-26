import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://gnmnncqmvwmvxyfturwm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdubW5uY3Ftdndtdnh5ZnR1cndtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxMTY5ODksImV4cCI6MjA2MzY5Mjk4OX0.pX7iFczItyd1ZuvE_9YHsf8NEUZubd6p3jFbnuNcqjM'
const supabase = createClient(supabaseUrl, supabaseKey)

const listContainer = document.getElementById('price-list')

async function fetchPrices() {
  const { data, error } = await supabase.rpc('get_price_comparison') // a stored procedure we'll define
  if (error) {
    listContainer.innerHTML = `<p>⚠️ Error loading data: ${error.message}</p>`
    return
  }

  listContainer.innerHTML = ''
  data.forEach(item => {
    const card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = `
      <div class="item-name">${item.item_name}</div>
      <div class="price-info">🟢 Lowest: Ksh ${item.lowest_price} – ${item.lowest_supplier}</div>
      <div class="price-info">🔴 Highest: Ksh ${item.highest_price} – ${item.highest_supplier}</div>
    `
    listContainer.appendChild(card)
  })
}

fetchPrices()
const searchInput = document.getElementById('search');

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll('.price-card');

  cards.forEach(card => {
    const itemName = card.querySelector('.item-name').textContent.toLowerCase();
    card.style.display = itemName.includes(searchTerm) ? 'block' : 'none';
  });
});

