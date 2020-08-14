import * as _ from 'lodash';
import Singleton from './Singleton';
import Field from './Field';

// Boolean
let muted: boolean = true;
muted = false;

// Números
let age = 6;
let numerador: number = 42;
let denominador: number = age;
let resultado = numerador / denominador;

// String
let nombre: string = 'Richard';
let saludo = `Me llamo ${nombre}`;

// Arreglos
let people: string[] = [];
people = ['Isabel', 'Nicole', 'Raul'];
// people.push("9000")

let peopleAndNumbers: Array<string | number> = [];
peopleAndNumbers.push('Ricardo');
peopleAndNumbers.push(9001);

// Enum
enum Color {
  Red = 'Rojo',
  Green = 'Verde',
  Blue = 'Azul',
  Yellow = 'Amarillo',
}

let colorFavorito: Color = Color.Yellow;
console.log(`Mi color favorito es ${colorFavorito}`);

// Any
let comodin: any = 'Joker';
comodin = { type: 'Wildcard' };

// Object
let someObject: object = { type: 'Wildcard' };

// Funciones
function add(a: number, b: number): number {
  return a + b;
}

const sum = add(4, 6);

function createAdder(a: number): (arg0: number) => number {
  return function(b: number) {
    return b + a;
  };
}

const addFour = createAdder(4);
const fourPlus6 = addFour(6);

function fullName(firstName: string, lastName: string = 'Smith'): string {
  return `${firstName} ${lastName}`;
}

const richard = fullName('Agente');
console.log(richard);

// Interfaces
enum Color {
  Rojo = 'Rojo',
  Verde = 'Verde',
}

interface Rectangulo {
  ancho: number;
  alto: number;
  color?: Color;
}

let rect: Rectangulo = {
  ancho: 4,
  alto: 6,
  // color: Color.Rojo,
};

function area(r: Rectangulo): number {
  return r.alto * r.ancho;
}

const areaRect = area(rect);
console.log(areaRect);

rect.toString = function() {
  return this.color ? `Un rectangulo ${this.color}` : `Un rectangulo`;
};

console.log(rect.toString());

const a = Singleton.getInstance();
const b = Singleton.getInstance();

console.log('¿A es igual a B?', a === b);

interface Observer {
  update: (data: any) => void;
}

interface Subject {
  subscribe: (observer: Observer) => void;
  unsubscribe: (observer: Observer) => void;
}

class XRPPrice implements Subject {
  observers: Observer[] = [];

  constructor () {
    const element: HTMLInputElement = document.querySelector("#value");
    element.addEventListener('input', () => {
      this.notify(element.value);
    });
  }

  subscribe (observer: Observer) {
    this.observers.push(observer);
  };

  unsubscribe (observer: Observer) {
    const index = this.observers.findIndex(obs => {
      return obs === observer;
    })
    this.observers.splice(index, 1);
  };

  notify(data: any) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class PriceDisplay implements Observer {
  private element: HTMLElement;

  constructor() {
    this.element = document.querySelector("#price");
  }

 update(data: any) {
  this.element.innerText = data;
 };
}

const value = new XRPPrice();
const display = new PriceDisplay();

value.subscribe(display);

setTimeout(() => value.unsubscribe(display), 3000);


  
function RequiredFieldDecorator(field: Field): Field {
  let validate = field.validate;

  field.validate = function() {
      validate();
      let value = field.input.value;
      if (!value) {
          field.errors.push('Requerido');
      }
  };

  return field;
}

function EmailFieldDecorator(field: Field): Field {
  let validate = field.validate;

  field.validate = function() {
      validate();
      let value = field.input.value;

      if (value.indexOf('@') === -1) {
          field.errors.push('Debe ser un email');
      }
  };

  return field;
}

let field = new Field(document.querySelector('#email'));
field = RequiredFieldDecorator(field);
field = EmailFieldDecorator(field);