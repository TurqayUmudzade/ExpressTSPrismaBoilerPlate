import { Router } from "express";
import authRoutes from "@src/models/auth/auth.routes"
import userRoutes from "@src/models/user/user.routes"
import victimRoutes from "@src/models/victim/victim.routes"
import scanRoutes from "@src/models/scan/scan.routes"
import attackTemplateRoutes from "@src/models/attack-template/attack-template.routes"
import { getAllSelectOptions } from "@src/models/victim/victim.services";
import { isAuthenticated } from "@src/middlewares/auth";


const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/user", userRoutes);
routes.use("/scan", scanRoutes);
routes.use("/victim", victimRoutes);
routes.use("/attack-template", attackTemplateRoutes);

//Globals
routes.get('/select-options', isAuthenticated, async (req: any, res, next) => {
    try {
        let allOptions = await getAllSelectOptions()
        return res.json(allOptions)
    } catch (err) {
        next(err);
    }
});

export default routes;