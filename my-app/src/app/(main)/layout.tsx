import MainLayout from "@/components/layout/MainLayout";

import StyleLayout from "./StyledLayout";

export default function TodosLayout({
    children
}:{
    children: React.ReactNode;
}) {
    return (
        <MainLayout>
            <StyleLayout children={children}/>
        </MainLayout>
    )
}