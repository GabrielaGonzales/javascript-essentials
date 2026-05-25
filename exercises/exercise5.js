import data from './json/compras_clientes.json' with { type: 'json' };

//console.log(data);

function generateReport(data) {
  const report = data.map(client => {
    const products = client.compras;

    const subTotal = products.reduce(
      (acc, prod) => acc + prod.precioUnitario * prod.cantidad,
      0
    );

    const totalAhorrado = products.reduce(
      (acc, prod) => acc + prod.precioUnitario * prod.cantidad * prod.descuento,
      0
    );

    const productoMasCaro = products.reduce((masCaro, prodAct) =>
      prodAct.precioUnitario > masCaro.precioUnitario ? prodAct : masCaro
    );

    return {
      cliente: client.nombre,
      totalProductos: products.length,
      subTotal,
      totalAhorrado,
      totalFinal: subTotal - totalAhorrado,
      productoMasCaro: productoMasCaro.producto
    };
  });

  return JSON.stringify(report);
}

console.log(generateReport(data));