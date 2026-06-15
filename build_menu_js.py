import json, os, re, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

data = json.load(open('hafsum_menu.json', encoding='utf-8'))

# normalize obvious listing typos for a polished site
FIX = {
    'Maxican Omelette': 'Mexican Omelette',
    'Ferroro Bliss Pastry': 'Ferrero Bliss Pastry',
    'Fettuccine Allfredo With 2 Piece Garlic': 'Fettuccine Alfredo with Garlic Bread',
    'Chicken Macaronis With Veggies': 'Chicken Macaroni with Veggies',
    'Onion Garlic & Flavored Fries': 'Onion & Garlic Flavored Fries',
    'Vanish Irish Coffee': 'Vanilla Irish Coffee',
}

GROUPS = {
    'Breakfast': 'Breakfast',
    'Winter Deal': 'Kitchen',
    'Cakes': 'Cakes & Bakery',
    'Pastries & Eclairs': 'Cakes & Bakery',
    'Muffins': 'Cakes & Bakery',
    'Sandwiches &  Panini ': 'Kitchen',
    'Savouries': 'Kitchen',
    'Soups': 'Kitchen',
    'Assorted Fries': 'Kitchen',
    'Customized Cake (Pre Order Before 24HRS)': 'Cakes & Bakery',
    'Donuts': 'Cakes & Bakery',
    'Cupcakes': 'Cakes & Bakery',
    'Dry Cakes': 'Cakes & Bakery',
    'Desserts': 'Cakes & Bakery',
    'Pie & Tarts': 'Cakes & Bakery',
    'Brownies': 'Cakes & Bakery',
    'Croissant ': 'Cakes & Bakery',
    'Breads': 'Cakes & Bakery',
    'Salads': 'Kitchen',
    'Mocktails': 'Drinks',
    'Coffee': 'Coffee',
    'Flavored Coffee': 'Coffee',
    'Beverages': 'Drinks',
}

GROUP_ORDER = ['Coffee', 'Breakfast', 'Cakes & Bakery', 'Kitchen', 'Drinks']

out = {'vendor': data['vendor'], 'groups': GROUP_ORDER, 'categories': []}
uid = 0
for cat in data['categories']:
    raw = cat['name']
    name = re.sub(r'\s+', ' ', raw).strip()
    if name == 'Customized Cake (Pre Order Before 24HRS)':
        name = 'Customized Cakes (Pre-order 24 hrs)'
    items = []
    for it in cat['items']:
        uid += 1
        nm = FIX.get(it['name'], it['name'])
        desc = re.sub(r'\s+', ' ', (it.get('desc') or '')).strip()
        items.append({
            'id': uid,
            'name': nm,
            'desc': desc,
            'price': round(it['price']) if it.get('price') else None,
            'img': it.get('local_image') or '',
        })
    out['categories'].append({'name': name, 'group': GROUPS.get(raw, 'Kitchen'), 'items': items})

os.makedirs(os.path.join('hafsum-website', 'js'), exist_ok=True)
with open(os.path.join('hafsum-website', 'js', 'menu-data.js'), 'w', encoding='utf-8') as f:
    f.write('// Hafsum Coffee & Cake — menu data (generated from the live Foodpanda listing)\n')
    f.write('window.HAFSUM_MENU = ')
    json.dump(out, f, ensure_ascii=False, indent=1)
    f.write(';\n')

n = sum(len(c['items']) for c in out['categories'])
print(f'menu-data.js written: {len(out["categories"])} categories, {n} items')
