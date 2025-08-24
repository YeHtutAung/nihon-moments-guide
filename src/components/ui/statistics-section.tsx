import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  type ChartConfig 
} from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Sample data for student enrollment by year
const enrollmentData = [
  { year: "2020", students: 45 },
  { year: "2021", students: 78 },
  { year: "2022", students: 112 },
  { year: "2023", students: 156 },
  { year: "2024", students: 189 },
];

// Sample data for COE success rate
const coeSuccessData = [
  { name: "Approved", value: 87, fill: "hsl(var(--chart-1))" },
  { name: "Pending", value: 8, fill: "hsl(var(--chart-2))" },
  { name: "Rejected", value: 5, fill: "hsl(var(--chart-3))" },
];

const enrollmentConfig: ChartConfig = {
  students: {
    label: "Students",
    color: "hsl(var(--chart-1))",
  },
};

const coeConfig: ChartConfig = {
  approved: {
    label: "Approved",
    color: "hsl(var(--chart-1))",
  },
  pending: {
    label: "Pending", 
    color: "hsl(var(--chart-2))",
  },
  rejected: {
    label: "Rejected",
    color: "hsl(var(--chart-3))",
  },
};

export const StatisticsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Our Success in Numbers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track our growing community and exceptional success rates in helping students achieve their Japanese education dreams
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Student Enrollment by Year */}
          <Card className="border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                📈 Student Enrollment Growth
              </CardTitle>
              <p className="text-muted-foreground">
                Annual growth of students joining our agency
              </p>
            </CardHeader>
            <CardContent>
              <ChartContainer config={enrollmentConfig} className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={enrollmentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis 
                      dataKey="year" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                      cursor={{ fill: "hsl(var(--muted/50))" }}
                    />
                    <Bar
                      dataKey="students"
                      fill="hsl(var(--chart-1))"
                      radius={[4, 4, 0, 0]}
                      className="transition-all duration-300 hover:opacity-80"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-primary">320% growth</span> over 5 years
                </p>
              </div>
            </CardContent>
          </Card>

          {/* COE Success Rate */}
          <Card className="border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                🎯 COE Success Rate
              </CardTitle>
              <p className="text-muted-foreground">
                Certificate of Eligibility approval statistics
              </p>
            </CardHeader>
            <CardContent>
              <ChartContainer config={coeConfig} className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={coeSuccessData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      innerRadius={60}
                      paddingAngle={2}
                      dataKey="value"
                      className="transition-all duration-300"
                    >
                      {coeSuccessData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.fill}
                          className="hover:opacity-80 transition-opacity duration-300"
                        />
                      ))}
                    </Pie>
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="mt-4 space-y-2">
                {coeSuccessData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.fill }}
                      />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <span className="text-sm font-bold">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          <div className="text-center p-6 bg-card rounded-lg border border-primary/10">
            <div className="text-3xl font-bold text-primary mb-2">189</div>
            <div className="text-sm text-muted-foreground">Total Students (2024)</div>
          </div>
          <div className="text-center p-6 bg-card rounded-lg border border-primary/10">
            <div className="text-3xl font-bold text-primary mb-2">87%</div>
            <div className="text-sm text-muted-foreground">COE Approval Rate</div>
          </div>
          <div className="text-center p-6 bg-card rounded-lg border border-primary/10">
            <div className="text-3xl font-bold text-primary mb-2">15+</div>
            <div className="text-sm text-muted-foreground">Partner Universities</div>
          </div>
          <div className="text-center p-6 bg-card rounded-lg border border-primary/10">
            <div className="text-3xl font-bold text-primary mb-2">5</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
};