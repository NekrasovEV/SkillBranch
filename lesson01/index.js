import Skb from 'skb'

//let Skb = require('skb');
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODE4ZDJiZDJmYjc0ZDAwMTFiZTdjYzUiLCJ1c2VybmFtZSI6Im1hbGRpbmlub3NAbWFpbC5ydSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNDc4MDIxODI0fQ.0qVtwr97M6Xp7NGHq5MLY3WmXQmrxDT0O3rCNJQU4QQ';
let skb = new Skb(token);
skb.taskHelloWorld('Тестовый запрос');