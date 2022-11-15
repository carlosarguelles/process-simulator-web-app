export interface Process {
  executions: number;
  fullName: string;
  name: string;
  pid: number;
  priority: boolean;
  quantum: number;
  user: string;
  cpuTime: number;
}
