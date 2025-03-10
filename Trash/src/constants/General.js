const WELCOME_CONTENTS = [
  {
      image: 'img1',
      title: 'Sell your Waste',
      content: 'Turn your waste into wealth with every scrap you sell!',
      route: 'Home',
  },
  {
      image: 'img2',
      title: 'Trash Media',
      content: 'Share your thoughts!',
      route: 'CookLikeAChef',
  },
  {
      image: 'img3',
      title: 'Save The Planet!',
      content: 'Know something more!',
      route: 'EducationalContent',
  },
]

const API_BASE_URL = "http://172.30.29.4:3001/"

const MENUS_CONTENTS =[{
    name: 'Cook Like A Chef!',
    desc: 'Discover recipes tailored to your cravings or dietary needs',
    img: 'w1',
    route: 'CookLikeAChef',
  },
  {
    name: 'What to Cook?',
    desc: 'Discover recipes using only what\'s in your pantry',
    img: 'whatscooking',
    route: 'WhatToCook',
  },
  {
    name: 'Smart Meal Planner',
    desc: 'Plan your meals with personalized suggestions',
    img: 'mealplan',
    route: 'SmartMealPlanner',
  },
  {
    name: 'Pantry Pro',
    desc: 'Organize your food inventory and manage your list',
    img: 'cartcomp',
    route: 'PantryPro',
  },
  {
    name: 'Cart Companion',
    desc: 'Manage your shopping list and be ready for grocery runs',
    img: 'pantrypro',
    route: 'CartCompanion',
  },
]



export default {WELCOME_CONTENTS,MENUS_CONTENTS,API_BASE_URL}