export const NewCard = () => {
  return (
    <div className="flex max-w-sm min-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="w-32 bg-cover" style={{backgroundImage: "url('https://images.demandware.net/dw/image/v2/BBBV_PRD/on/demandware.static/-/Sites-master-catalog/default/dwd633af54/images/700000/704909.jpg?sfrm=jpg')"}}>
      </div> 
      <div className="w-64 p-4">
        <h1 className="text-gray-900 font-bold text-2xl overflow-hidden w-54 h-8">AAAAAAAAAAAAAAAAAAASAA</h1>
        <p className="mt-2 text-gray-600 text-sm w-54 overflow-hidden h-10">prova1 prova2 prova3 prova4 prova5 prova6 prova7 prova8 prova9 prova10 prova11 prova12 prova13 prova14 prova15</p>
        <div className="flex item-center justify-between mt-3">
          <h1 className="text-gray-700 font-bold text-xl">$220</h1>
        </div>
        <div className="flex item-center justify-between mt-3">
          <button className="text-gray-700 font-bold text-xl">$220</button>
          <button className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">Add to Card</button>
        </div>
      </div>
    </div>
  )
}
