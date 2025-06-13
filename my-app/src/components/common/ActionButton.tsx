import { Button} from "@mui/material"

export default function ActionButton({ 
    handler, mcolor, text 
}: {
    handler: () => void,
    mcolor: "error"| "success" | "inherit" | "warning",
    text: string,
}) {
    return (
        <Button
            sx={{
                mx: 2,
                boxShadow: 1,
                transition: "all 0.2s",
                "&:hover": {
                    boxShadow: 2,
                    backgroundColor: "transparent",
                    fontWeight: "bold",
                    color: (theme) => theme.palette.info.main,
                    border: (theme) => `1px solid ${theme.palette.info.main}`,
                },
            }}
            color={mcolor}
            variant="contained"
            onClick={handler}
        >
            {text}
        </Button>
    );
}
