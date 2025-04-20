import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Users,
  Calendar,
  MapPin,
  Globe,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Mail,
  Phone,
  CheckCircle,
  Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setSingleCompany } from "@/redux/slices/companySlice";
import { toast } from "sonner";

const CompanyDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleCompany: company } = useSelector((state) => state.company);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch company details
    const getCompanyDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8400/api/company/${id}`,{withCredentials:true});
        console.log(res.data);
        if (res.status === 200) {
          dispatch(setSingleCompany(res.data));
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch company details. Please try again later.");
        toast.error("Failed to fetch company details.");
      } finally {
        setLoading(false);
      }
    };
    getCompanyDetails();
  }, [dispatch, id]);

  // Extract first letter of company name for avatar fallback
  const firstLetter = company?.name
    ? company?.name.charAt(0).toUpperCase()
    : "C";

  // Format founded year
  const foundedYear = company?.foundedYear
    ? company?.foundedYear.toString()
    : "N/A";

  // Handle headquarters display
  const headquarters = company?.locations
    ? company?.locations.isHeadquarters
      ? `${company?.locations.city || ""}, ${company?.locations.state || ""}, ${
          company?.locations.country || ""
        }`
          .trim()
          .replace(/^, |, $|, , /g, "")
      : "No headquarters specified"
    : "No location data";

  if (loading) {
    return <div className="text-center my-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center my-10 text-red-500">{error}</div>;
  }

  if (!company) {
    return <div className="text-center my-10">Company not found.</div>;
  }

  return (
    <div className="min-h-screen my-10">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={company?.logo} alt={`${company?.name} logo`} />
            <AvatarFallback className="text-xl">{firstLetter}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-2xl">{company?.name}</CardTitle>
              {company?.isVerified && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
            </div>
            <CardDescription className="text-base mt-1">
              {company?.industry}
            </CardDescription>
          </div>
          <Link to={"/recruiter/companies/update-company"}>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              <span>Update</span>
            </Button>
          </Link>
        </CardHeader>

        <CardContent className="space-y-6">
          {company?.description && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">About</p>
              <p>{company?.description}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Industry:</span>
              <span className="text-sm">
                {company?.industry || "Not specified"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Size:</span>
              <span className="text-sm">
                {company?.companySize || "Not specified"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Founded:</span>
              <span className="text-sm">{foundedYear}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Headquarters:</span>
              <span className="text-sm">{headquarters}</span>
            </div>
          </div>

          {company?.website && (
            <div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Website:</span>
                <a
                  href={company?.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  {company?.website}
                </a>
              </div>
            </div>
          )}

          {(company?.socialMedia?.linkedin ||
            company?.socialMedia?.twitter ||
            company?.socialMedia?.facebook ||
            company?.socialMedia?.instagram) && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Social Media</p>
              <div className="flex gap-3">
                {company?.socialMedia?.linkedin && (
                  <a
                    href={company?.socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                {company?.socialMedia?.twitter && (
                  <a
                    href={company?.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
                {company?.socialMedia?.facebook && (
                  <a
                    href={company?.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                )}
                {company?.socialMedia?.instagram && (
                  <a
                    href={company?.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          )}

          <Separator />

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Contact Information</p>

            {company?.contactEmail && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`mailto:${company?.contactEmail}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {company?.contactEmail}
                </a>
              </div>
            )}

            {company?.contactPhone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href={`tel:${company?.contactPhone}`} className="text-sm">
                  {company?.contactPhone}
                </a>
              </div>
            )}

            {company?.locations && (
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="text-sm">
                  {company?.locations.address && (
                    <div>{company?.locations.address}</div>
                  )}
                  {(company?.locations.city ||
                    company?.locations.state ||
                    company?.locations.zipCode) && (
                    <div>
                      {company?.locations.city}
                      {company?.locations.city && company?.locations.state
                        ? ", "
                        : ""}
                      {company?.locations.state} {company?.locations.zipCode}
                    </div>
                  )}
                  {company?.locations.country && (
                    <div>{company?.locations.country}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="text-xs text-muted-foreground border-t pt-4">
          Last updated: {new Date().toLocaleDateString()}
        </CardFooter>
      </Card>
    </div>
  );
};

export default CompanyDetails;