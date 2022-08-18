import { Request, Response, Application } from "express";
import UserControllers from "../controllers/userControllers";
import LocationControllers from "../controllers/locationControllers";
import { middlewares } from "../middlewares";
import {checkJwt} from "../middlewares/checkJwt";
import {checkRole} from "../middlewares/checkRoles";

const { responses, messages, codes } = middlewares;

const User = new UserControllers();
const Location = new LocationControllers();

class Routes {
    public router = (app: Application): any => {
        app.get("/", (req: Request, res: Response) => {
            responses.ok(codes.ok(), messages.welcomeMessage(), res);
        });

        app.get("/locations", Location.findAllLocations)
        app.get("/users/:user_id/locations", Location.findAllLocationsFromOneUser);
        app.get("/users/:user_id/locations/:location_id", Location.findOneLocation);
        app.post("/users/:user_id/create", Location.createLocation);
        app.put("/users/:user_id/update/:location_id", Location.updateLocation);
        app.delete("/users/:user_id/delete/:location_id", Location.deleteLocation)

        app.all("*", (req: Request, res: Response) => {
            responses.ok(codes.notFound(), messages.pageNotFound(), res);
        });
    };
}

export const location = new Routes().router;