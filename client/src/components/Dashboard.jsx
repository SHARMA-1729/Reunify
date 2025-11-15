import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  User,
  MapPin,
  Phone,
} from 'lucide-react';

export function Dashboard() {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found, please login');
          setLoading(false);
          return;
        }
        const decoded = jwtDecode(token);
        const role = decoded.role || 'parent';
        const url =
          role === 'parent'
            ? `${import.meta.env.VITE_API_URL}/api/lost`
            : `${import.meta.env.VITE_API_URL}/api/found`;

        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = Array.isArray(res.data) ? res.data : [res.data];
        setReports(data);
        setError(null);
      } catch (err) {
        setError(
          err.response?.status === 404
            ? 'No reports found'
            : err.response?.data?.message || err.message
        );
        console.error('Fetch error:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading reports...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Your Reports</h1>
        <p className="text-muted-foreground">
          View and manage your submitted reports
        </p>
      </div>

      {error && (
        <Card className="mb-8 border-destructive">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <CardTitle className="text-destructive">Error</CardTitle>
            </div>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
        </Card>
      )}

      {reports.length === 0 && !error && (
        <Card>
          <CardHeader>
            <CardTitle>No Reports Found</CardTitle>
            <CardDescription>
              You haven't submitted any reports yet. Start by reporting a lost
              or found child.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {reports.map((report) => (
          <Card
            key={report._id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            {report.photo && (
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={report.photo}
                  alt={`${report.name}'s photo`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    console.log('Image load error:', e);
                  }}
                />
              </div>
            )}
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-xl">
                  {typeof report.name === 'string'
                    ? report.name.replace(/"/g, '')
                    : report.name}
                </CardTitle>
                {report.isFound !== undefined && (
                  <Badge variant={report.isFound ? 'default' : 'secondary'}>
                    {report.isFound ? (
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Found
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Searching
                      </div>
                    )}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {(report.age || report.approximateAge) && (
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>Age: {report.age || report.approximateAge}</span>
                </div>
              )}

              {(report.location || report.lastLocation) && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">
                    {typeof (report.location || report.lastLocation) ===
                    'string'
                      ? (report.location || report.lastLocation).replace(
                          /"/g,
                          ''
                        )
                      : report.location || report.lastLocation}
                  </span>
                </div>
              )}

              {report.height && (
                <div className="text-sm">
                  <span className="font-medium">Height:</span>{' '}
                  {typeof report.height === 'string'
                    ? report.height.replace(/"/g, '')
                    : report.height}
                </div>
              )}

              {report.skinColor && (
                <div className="text-sm">
                  <span className="font-medium">Skin Color:</span>{' '}
                  {report.skinColor}
                </div>
              )}

              {report.appearance && (
                <div className="text-sm">
                  <span className="font-medium">Appearance:</span>{' '}
                  {report.appearance}
                </div>
              )}

              {report.details && (
                <div className="text-sm">
                  <span className="font-medium">Details:</span> {report.details}
                </div>
              )}

              {report.finder && report.isFound && (
                <div className="mt-4 pt-4 border-t space-y-2">
                  <p className="font-medium text-sm">Found By:</p>
                  {report.finder.name && (
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{report.finder.name}</span>
                    </div>
                  )}
                  {report.finder.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{report.finder.phone}</span>
                    </div>
                  )}
                </div>
              )}

              {report.contact && (
                <div className="mt-4 pt-4 border-t">
                  <p className="font-medium text-sm mb-2">Submitted By:</p>
                  <p className="text-sm text-muted-foreground">
                    {report.contact}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
