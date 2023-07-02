import { rpcWAXService } from "../../services/rpcWAXService";

export const getTableRows = async (req: any, res: any) => {
    try {
        const data = await rpcWAXService.getTableRows(req.params.code, req.params.scope, req.params.table);
        console.log(data);
        
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({
            error,
        });
    }
}