## Controllers

Controllers process client requests and return a response. The controllers are located in the `./controllers` folder. To facilitate code organization and maintenance, the logic within the controllers is implemented using services, which are located in the `./services` folder.

Here's an example of a controller:

```javascript
import { rpcController } from "../../services/rpcController";

export const getInfo = async (req: any, res: any) => {
  try {
    const info = await rpcController.getInfo();
    res.status(200).json({
      info,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
```

This controller imports the `rpcController` service and executes the `getInfo` method from that service. The `rpcController` service is located in the `./services/rpcController.ts` file.

If you want to add new controllers, you should create a new file in the `./controllers` folder and add each controller to the route list.