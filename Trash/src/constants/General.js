const WELCOME_CONTENTS = [
    {
        image: 'w1',
        title: 'Sell your Waste',
        content: 'blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah',
        route: 'Home',
    },
    {
        image: 'w1',
        title: 'Social Media',
        content: 'blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah',
        route: 'CookLikeAChef',
    },
    {
        image: 'w1',
        title: 'Educatiional Content',
        content: 'blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah',
        route: 'CookLikeAChef',
    },
]

const API_BASE_URL = "http://172.20.10.3:3001/"

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