import { Component } from '@angular/core';
import { ViewapiPageService } from '../services/viewapi-page.service';

@Component({
  selector: 'app-viewapi-page',
  templateUrl: './viewapi-page.component.html',
  styleUrl: './viewapi-page.component.css'
})
export class ViewapiPageComponent {
  // throttle
  isIpFilterEnabled = false; // Initially false

  constructor(private viewapiPageService: ViewapiPageService) {

  }
  onToggleChange(event: any) {
    this.isIpFilterEnabled = event.checked; // Capture toggle state
  }
  items = [
    { name: 'EndPoint' },
    { name: 'Parameter Forwarding' },
    { name: 'Auth' },
    { name: 'Throttling' },
    { name: 'Policies' },
    { name: 'Response Manipulation' },
    { name: 'connectivity Options' },
    { name: 'Open Api' },
    { name: 'Backends(Upstream)' }
  ];
  selectedItem: any;

  selectItem(item: any) {
    console.log(item);

    this.selectedItem = item;
  }
  ngOnInit() {
    this.selectedItem = this.items[0];
  }
  onFormSubmit(formData: any) {
    console.log("Form data received from child:", formData);
    // Handle the form data, e.g., submit it to a service or API.
  }
  entireFormData: any = {
    endPoint: null,
    parameterForwarding: null,
    throttling: null,
    responseManipulation: null,
    connectivityOptions: null,
    policies: null,
    auth: null,
    openApi: null
  };

  collectData(formName: string, data: any) {
    this.entireFormData[formName] = data;
    console.log("Form data collected:", this.entireFormData);
  }
  submitForm() {
    const resultantFormData = {
      "$schema": "string",
      "version": 0,
      "name": "string",
      "port": 0,
      "host": [
        "string"
      ],
      "timeout": "string",
      "cache_ttl": "string",
      "debug_endpoint": true,
      "endpoints": [
        {
          "@comment": "string",
          "endpoint": "string",
          "backend": [
            {
              "host": [
                "string"
              ],
              "url_pattern": "string",
              "allow": [
                "string"
              ],
              "mapping": {
                "blog": "string",
                "collection": "string",
                "CapitalCityResult": "string"
              },
              "group": "string",
              "is_collection": true,
              "encoding": "string",
              "extra_config": {
                "plugin/req-resp-modifier": {
                  "name": [
                    "string"
                  ],
                  "content-replacer": {}
                },
                "qos/ratelimit/proxy": {
                  "max_rate": 0,
                  "capacity": 0
                },
                "qos/http-cache": {
                  "shared": true
                },
                "backend/graphql": {
                  "type": "string",
                  "query": "string",
                  "variables": {}
                },
                "backend/soap": {
                  "@comment": "string",
                  "path": "string"
                },
                "backend/grpc": {
                  "input_mapping": {
                    "lat": "string",
                    "lon": "string",
                    "Id_flight": "string",
                    "Main_passenger": "string"
                  },
                  "response_naming_convention": "string",
                  "output_enum_as_string": true,
                  "output_timestamp_as_string": true,
                  "output_duration_as_string": true,
                  "client_tls": {
                    "allow_insecure_connections": true
                  },
                  "output_remove_unset_values": true,
                  "use_request_body": true
                },
                "backend/static-filesystem": {
                  "directory_listing": true,
                  "path": "string"
                }
              },
              "target": "string",
              "method": "string",
              "deny": [
                "string"
              ],
              "@comment": "string",
              "@test_with": "string",
              "disable_host_sanitize": true
            }
          ],
          "extra_config": {
            "documentation/openapi": {
              "summary": this.entireFormData.openApi.summary,
              "description": this.entireFormData.openApi.description,
              "tags": [
                "string"
              ]
            },
            "modifier/jmespath": {
              "@comment": "string",
              "expr": "string"
            },
            "security/policies": {
              "req": {
                "policies": this.entireFormData.policies.secReqPolicyArrayValue,
                "error": {
                  "body": this.entireFormData.policies.secReqErrorBody,
                  "status": this.entireFormData.policies.secReqErrorStCode
                }
              }
            },
            "qos/ratelimit/router": {
              "max_rate": 0
            },
            "proxy": {
              "sequential": true,
              "static": {
                "data": {},
                "strategy": "string"
              }
            },
            "@comment": "string",
            "auth/basic": {
              "@comment": "string",
              "htpasswd_path": "string"
            },
            "validation/cel": [
              {
                "check_expr": "string"
              }
            ],
            "auth/validator": {
              "alg": "string",
              "audience": [
                "string"
              ],
              "roles_key": this.entireFormData.auth.rolesKey,
              "roles": this.entireFormData.auth.rolesArrayValue,
              "jwk_url": this.entireFormData.auth.jwkUri,
              "issuer": this.entireFormData.auth.issuer,
              "jwk_local_path": "string",
              "disable_jwk_security": true
            },
            "auth/signer": {
              "alg": "string",
              "kid": "string",
              "keys_to_sign": this.entireFormData.auth.keysToSignArrayValue,
              "jwk_local_path": "string",
              "disable_jwk_security": true
            },
            "auth/api-keys": {
              "roles": [
                "string"
              ]
            },
            "websocket": {
              "input_headers": [
                "string"
              ],
              "connect_event": true,
              "disconnect_event": true,
              "read_buffer_size": this.entireFormData.connectivityOptions.readBufferSize,
              "write_buffer_size": this.entireFormData.connectivityOptions.writeBufferSize,
              "message_buffer_size": 0,
              "max_message_size": 0,
              "write_wait": this.entireFormData.connectivityOptions.writeWait,
              "pong_wait": this.entireFormData.connectivityOptions.pongWait,
              "ping_period": "string",
              "max_retries": this.entireFormData.connectivityOptions.maxRetries,
              "backoff_strategy": this.entireFormData.connectivityOptions.backoffStrategy
            }
          },
          "output_encoding": "string",
          "@test_with": "string",
          "input_headers": [
            "string"
          ],
          "concurrent_calls": 0,
          "method": "string",
          "input_query_strings": [
            "string"
          ]
        }
      ],
      "sequential_start": true,
      "async_agent": [
        {
          "name": "string",
          "backend": [
            {
              "host": [
                "string"
              ],
              "url_pattern": "string",
              "method": "string"
            }
          ],
          "consumer": {
            "topic": "string",
            "workers": 0
          },
          "connection": {
            "max_retries": 0,
            "backoff_strategy": "string"
          },
          "extra_config": {
            "async/amqp": {
              "name": "string",
              "host": "string",
              "exchange": "string",
              "prefetch_count": 0,
              "auto_ack": true
            }
          }
        }
      ],
      "extra_config": {
        "grpc": {
          "catalog": [
            "string"
          ],
          "server": {
            "services": [
              {
                "name": "string",
                "methods": [
                  {
                    "name": "string",
                    "input_headers": [
                      "string"
                    ],
                    "payload_params": {
                      "page.cursor": "string"
                    },
                    "backend": [
                      {
                        "host": [
                          "string"
                        ],
                        "url_pattern": "string",
                        "extra_config": {
                          "backend/grpc": {
                            "use_request_body": true
                          }
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        },
        "server/static-filesystem": {
          "prefix": "string",
          "path": "string",
          "directory_listing": true
        },
        "router": {
          "return_error_msg": true,
          "disable_gzip": true
        },
        "auth/basic": {
          "@comment": "string",
          "htpasswd_path": "string"
        },
        "plugin/http-server": {
          "name": [
            "string"
          ],
          "geoip": {
            "citydb_path": "string"
          },
          "url-rewrite": {
            "literal": {
              "/git-profile": "string"
            },
            "regexp": [
              [
                "string"
              ]
            ]
          }
        },
        "documentation/openapi": {
          "version": "string",
          "contact_name": "string",
          "contact_email": "string",
          "license_name": "string",
          "license_url": "string"
        },
        "auth/api-keys": {
          "keys": [
            {
              "key": "string",
              "roles": [
                "string"
              ],
              "@description": "string"
            }
          ]
        },
        "telemetry/opentelemetry": {
          "service_name": "string",
          "metric_reporting_period": 0,
          "trace_sample_rate": 0,
          "exporters": {
            "otlp": [
              {
                "disable_metrics": true,
                "disable_traces": true,
                "host": "string",
                "name": "string",
                "port": 0,
                "use_http": true
              }
            ],
            "prometheus": [
              {
                "name": "string",
                "port": 0,
                "process_metrics": true,
                "go_metrics": true
              }
            ]
          },
          "layers": {
            "global": {
              "disable_metrics": true,
              "disable_propagation": true,
              "disable_traces": true,
              "report_headers": true
            },
            "proxy": {
              "disable_metrics": true,
              "disable_traces": true,
              "report_headers": true
            },
            "backend": {
              "metrics": {
                "detailed_connection": true,
                "disable_stage": true,
                "read_payload": true,
                "round_trip": true
              },
              "traces": {
                "detailed_connection": true,
                "disable_stage": true,
                "read_payload": true,
                "report_headers": true,
                "round_trip": true
              }
            }
          }
        },
        "telemetry/logging": {
          "level": "string",
          "prefix": "string",
          "syslog": true,
          "stdout": true
        },
        "telemetry/gelf": {
          "address": "string",
          "enable_tcp": true
        },
        "security/cors": {
          "allow_origins": [
            "string"
          ],
          "allow_methods": [
            "string"
          ],
          "allow_headers": [
            "string"
          ],
          "expose_headers": [
            "string"
          ],
          "max_age": "string"
        },
        "auth/revoker": {
          "@comment": "string",
          "hash_name": "string",
          "N": 0,
          "P": 0,
          "port": 0,
          "token_keys": [
            "string"
          ],
          "TTL": 0,
          "revoke_server_ping_url": "string",
          "revoke_server_ping_interval": "string",
          "revoke_server_api_key": "string",
          "revoke_server_max_workers": 0
        }
      }
    }
    console.log(this.entireFormData);

    this.viewapiPageService.createEndPoint(resultantFormData).subscribe({
      next: (res) => {
        console.log(res);

      }
    })
    // submitForm() {
    //   console.log(this.entireFormData);

    // }
  }
}
