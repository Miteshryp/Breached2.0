import Dashboard from "./../Components/Dashboard";
import AdminScreen from "./Screens/AdminScreen";
import {ChartBarIcon} from "@heroicons/react/solid"

export default function AdminDashboard() {
    const screens = [{
        screenComponent: () => {
            return (<AdminScreen />)
        },
        iconComponent: ChartBarIcon 
    }]
    return (
        <div>
            <Dashboard screens={screens} />
        </div>
    )
}