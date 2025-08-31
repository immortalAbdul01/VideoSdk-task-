## Architecture

- **WebSocket Server**: Node.js server with Express and ws library [✔️]
- **Metrics**: Prometheus metrics for monitoring [✔️]
- **Load Testing**: k6-based WebSocket load testing [✔️]
- **Containerization**: Docker containerization [pending]
- **Orchestration**: Kubernetes deployment with HPA [pending]
- **Observability**: Prometheus + Grafana monitoring stack [pending]

## Expected outcomes

1. Containerize application using docker
2. Deployment using k8s
3. Monitoring and Observability Dashboard using grafana+prometheus
4. short 2-3 min of video of explanation

_we are not expecting to complete all of the steps mentioned above. if you are able to complete one outcome that is completely fine._

## Expected Future Project Structure

```
devops-intern-task/
├── server/
│   ├── index.js          # WebSocket server with metrics
│   ├── package.json      # Node.js dependencies
│   └── Dockerfile        # Container definition
├── loadtest/
│   └── websocket-test.js # k6 load test script
├── k8s/
│   ├── deployment.yaml   # Kubernetes deployment
│   ├── service.yaml      # Service definition
│   ├── ingress.yaml      # Ingress configuration
│   ├── hpa.yaml          # Horizontal Pod Autoscaler
│   └── monitoring/
│       ├── prometheus.yaml
│       └── grafana.yaml
└── README.md
```

### Expected Grafana & Prometheus Dashboard

includes a comprehensive Grafana dashboard with:

#### Dashboard Panels

1. **Connection Overview**

   - Active connections gauge
   - Connection rate (connections/sec)
   - Total connections over time

2. **Message Throughput**

   - Messages received/sec
   - Messages sent/sec
   - Message latency distribution

3. **Scaling Events**

   - Pod count over time
   - CPU utilization
   - Connection drops during scaling

4. **System Health**
   - Pod status
   - Resource usage
   - Error rates

#### Scaling Validation (Optional)

- **Connection Persistence**: Verify connections don't drop during scaling
- **Auto-scaling Triggers**: Confirm HPA activates under load
- **Graceful Scaling**: Monitor connection handling during scale events

For questions or issues, please reachout to HR.
