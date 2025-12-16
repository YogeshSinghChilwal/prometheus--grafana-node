import type { Request, Response, NextFunction } from "express";
import { httpRequestDurationMicroseconds } from "./requestTime.js";
import { activeRequestsGauge } from "./activeRequest.js";
import { requestCounter } from "./requestCount.js";

export const metricsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();

  res.on("finish", function () {
    const endTime = Date.now();
    activeRequestsGauge.inc()

    const duration = endTime - startTime;

    requestCounter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode
        });

    httpRequestDurationMicroseconds.observe(
      {
        method: req.method,
        route: req.route ? req.route.path : req.path,
        code: res.statusCode,
      },
      duration
    );
  });
  next()
};
