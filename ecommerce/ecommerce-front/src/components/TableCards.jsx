import { Card } from "./Card"
import { Sidebar } from "./Sidebar"

export const TableCards = () => {
  return (
    <div className="flex flex-row gap-2">
        <Sidebar/>
        <div className="flex flex-row flex-wrap">
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </div>
    </div>
  )
}
