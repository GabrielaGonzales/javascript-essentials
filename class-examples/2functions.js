const something = _ => {
  return "hola";
}

console.log(something(1,2,3));

const calcular = (a, b, operacion) => operacion(a, b);

const sumar = (x, y) => x + y;

console.log(calcular(2, 3, sumar));
