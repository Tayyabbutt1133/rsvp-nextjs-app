"use client";
import React from "react";
import { useState } from "react";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { strings } from "@/utils/strings";
import { submitRSVP } from "../server/Addrsvps";
import { toast } from "sonner";

const RsvpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [accompany, setAccompany] = useState("");
  const [attendance, setAttendance] = useState("yes");
  const [error, seterror] = useState({});
  const [isloading, setIsloading] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      seterror(name, "Name is Required !");
      return;
    }
    if (!email) {
      seterror(email, "Email is Required !");
      return;
    }

    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("accompany", accompany || "0");
    formdata.append("attendance", attendance);

    console.log("Form data : ", formdata);
    setIsloading(true);
    const response = await submitRSVP(formdata);
    console.log("Response from Supabase backend : ", response);

    if (response.success) {
      toast(`${strings.thankYouMessage}`);
      // after successful form submission
      setName("");
      setEmail("");
      setAccompany(null);
      setAttendance("yes");
    } else {
      toast(`${response.message}`);
      // Todo later on : check if the email is already submitted
    }
    setIsloading(false);
  };

  const openGoogleMaps = async () => {
    // alert("Google button clicked")
    const encodedLocation = encodeURIComponent(strings.eventLocation);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`
    );
  };

  return (
    <div className="max-w-md mx-auto my-10">
      <h1 className="text-2xl font-bold mb-4">{strings.title}</h1>
      <p className="mb-6">{strings.description}</p>
      <div className="mb-6">
        <Label>{strings.eventDateLabel}</Label>
        <Calendar
          mode="single"
          selected={new Date(strings.eventDate)}
          className={"rounded-md mt-4 border flex flex-col items-center"}
          fromDate={new Date(strings.eventDate)}
          toDate={new Date(strings.eventDate)}
          defaultMonth={new Date(strings.eventDate)}
          ISOWeek
        />
        <div className="mt-4">
          <Button
            className="w-full cursor-pointer"
            type="button"
            variant={"outline"}
            onClick={openGoogleMaps}
          >
            <MapPin />
            {strings.viewOnMapButton}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">{strings.nameLabel}</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={"mt-2"}
          />
          {error.name && (
            <p className="text-red-700 text-sm mt-1">{error.name}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email">{strings.emailLabel}</Label>
          <Input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={"mt-2"}
          />
          {error.name && (
            <p className="text-red-700 text-sm mt-1">{error.name}</p>
          )}
        </div>
        <div>
          <Label htmlFor="accompany">{strings.accompanyLabel}</Label>
          <Input
            id="accompany"
            type="number"
            min="0"
            value={accompany || ""}
            onChange={(e) => setAccompany(e.target.value)}
            className={"mt-2"}
          />
        </div>
        <div>
          <Label>{strings.rsvpLabel}</Label>
          <RadioGroup
            className="mt-2"
            value={attendance}
            onValueChange={setAttendance}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes">{strings.yesOption}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no">{strings.noOption}</Label>
            </div>
          </RadioGroup>
        </div>
        <Button className="cursor-pointer" disabled={isloading} type="submit">
          {isloading ? "Submitting...." : strings.submitButton}
        </Button>
      </form>
    </div>
  );
};

export default RsvpForm;
