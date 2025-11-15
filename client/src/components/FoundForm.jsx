import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { Upload } from 'lucide-react';

export function FoundForm() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    approximateAge: '',
    appearance: '',
    contact: '',
    photo: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/found/report`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to submit report. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="container max-w-2xl mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Report Found Child</CardTitle>
          <CardDescription>
            Help reunite a child with their family by providing information
            about the child you found.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Child's Name (if known)</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Name if the child told you"
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location Found *</Label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="Where did you find the child?"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="approximateAge">Approximate Age *</Label>
                <Input
                  id="approximateAge"
                  name="approximateAge"
                  type="number"
                  placeholder="Estimated age"
                  value={formData.approximateAge}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  min="0"
                  max="18"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="appearance">Appearance Description</Label>
              <textarea
                id="appearance"
                name="appearance"
                placeholder="Physical features, clothing, identifying marks, etc."
                value={formData.appearance}
                onChange={handleChange}
                disabled={isLoading}
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Your Contact Number *</Label>
              <Input
                id="contact"
                name="contact"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.contact}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo">Photo *</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="cursor-pointer"
                />
                <Upload className="h-5 w-5 text-muted-foreground" />
              </div>
              {preview && (
                <div className="mt-4">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-w-xs rounded-md border"
                  />
                </div>
              )}
            </div>

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Submit Report
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
