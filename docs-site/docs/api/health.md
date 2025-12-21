---
id: health
title: Health API
---

## GET /api/health

Returns backend service health status.

### Request

```json
api/health
```


### Response
```json
{
  "status": "ok",
  "service": "mern-backend",
  "timestamp": "2025-01-01T12:00:00.000Z"
}
