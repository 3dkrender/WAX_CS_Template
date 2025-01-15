import { apiWAXService } from "../../services/apiWAXService";

export const getTableRows = async (req: any, res: any) => {
    try {
        const data = await apiWAXService.getTableRows(req.params.code, req.params.scope, req.params.table);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({
            error,
        });
    }
}