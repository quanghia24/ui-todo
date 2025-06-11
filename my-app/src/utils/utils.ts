import { NextResponse } from "next/server";

export function ParseJSON(){
    return;
}

export function WriteJSON(status: number, payload: any) {
    return NextResponse.json({ payload }, { status: status });
};

export function WriteError(status: number, error: Error) {
    return NextResponse.json({ error }, { status: status });
}

export function GetUserIdFromJWT(){}