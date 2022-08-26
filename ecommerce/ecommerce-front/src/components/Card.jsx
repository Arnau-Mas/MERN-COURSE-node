export const Card = ({ articulo }) => {
    return (
        <div>
        <div className="flex max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="w-1/3 bg-cover" style={{backgroundImage: "url('https://images.demandware.net/dw/image/v2/BBBV_PRD/on/demandware.static/-/Sites-master-catalog/default/dwd633af54/images/700000/704909.jpg?sfrm=jpg')"}}>
          </div> 
          <div className="w-2/3 p-4">
            <h1 className="text-gray-900 font-bold text-2xl">Backpack</h1>
            <p className="mt-2 text-gray-600 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit In odit exercitationem fuga id nam quia</p>
            <div className="flex item-center justify-between mt-3">
              <h1 className="text-gray-700 font-bold text-xl">$220</h1>
            </div>
            <div className="flex item-center justify-between mt-3">
              <button className="text-gray-700 font-bold text-xl">$220</button>
              <button className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">Add to Card</button>
            </div>
          </div>
        </div>
      </div>
    );
};
