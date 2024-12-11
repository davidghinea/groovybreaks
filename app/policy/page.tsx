import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FileText, Tag } from "lucide-react";
import Link from "next/link";

const PolicyPage = () => {
  return (
    <div className="relative top-[150px] mb-[186px] min-h-screen px-4 lg:px-8">
      <div className="mx-auto w-full max-w-[400px] md:max-w-[814px]">
        <div className="mb-12 space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-primary-foreground">
            Terms of Service & Privacy Policy
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              <span>Version 1.0</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <Button variant="link" className="h-auto p-0">
              <FileText className="mr-2 h-4 w-4" />
              View printable version
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-lg">
            <p className="text-lg leading-relaxed text-foreground">
              Welcome to <span className="text-primary">Groovy Breaks</span>. By
              using our service, you{" "}
              <span className="text-primary">agree to these terms</span>, our{" "}
              <span className="text-primary">privacy policy</span>, and{" "}
              <span className="text-primary">cookie policy</span>. Our service
              integrates with Spotify and requires a Spotify Premium account. We
              are committed to protecting your privacy while providing a
              seamless music experience during your study breaks.
            </p>
          </div>

          <Accordion type="single" className="space-y-4">
            <AccordionItem value="service">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-semibold">Service Agreement</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-xl font-semibold">
                      Service Description
                    </h4>
                    <p className="mt-8 text-foreground">
                      Groovy Breaks is a web application that enables users to
                      schedule and play music from their Spotify playlists
                      during study or work breaks. The service requires:
                    </p>
                    <ul className="list-decimal space-y-2 pl-6 text-muted-foreground">
                      <li>A valid Spotify Premium account</li>
                      <li>Authorization to access your Spotify playlists</li>
                      <li>A compatible playback device</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-semibold">
                      User Responsibilities
                    </h4>
                    <p className="mt-8 text-foreground">
                      Users are responsible for:
                    </p>
                    <ul className="list-decimal space-y-2 pl-6 text-muted-foreground">
                      <li>Maintaining their Spotify Premium subscription</li>
                      <li>
                        Ensuring their playback devices are properly configured
                      </li>
                      <li>
                        Using the service in compliance with Spotify's terms
                      </li>
                      <li>
                        Not attempting to circumvent any service limitations
                      </li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="privacy">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-semibold">Privacy Policy</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-xl font-semibold">Data Collection</h4>
                    <p className="mt-8 text-foreground">
                      We collect and process the following data:
                    </p>
                    <ul className="list-decimal space-y-2 pl-6 text-muted-foreground">
                      <li>
                        Spotify account information (name, email, profile
                        picture)
                      </li>
                      <li>Playlist information and preferences</li>
                      <li>Break schedule settings</li>
                      <li>Device playback information</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-semibold">Data Usage</h4>
                    <p className="mt-8 text-foreground">
                      Your data is used exclusively for:
                    </p>
                    <ul className="list-decimal space-y-2 pl-6 text-muted-foreground">
                      <li>Authentication with Spotify</li>
                      <li>Providing the core service functionality</li>
                      <li>Improving user experience</li>
                      <li>Technical service maintenance</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cookies">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-semibold">Cookie Policy</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pt-4">
                <div className="space-y-4">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="text-xl font-semibold">
                        Essential Cookies
                      </h4>
                      <p className="mt-8 text-foreground">
                        Required for authentication and maintaining your
                        session. These cookies are necessary for the app to
                        function and include:
                      </p>
                      <ul className="list-decimal space-y-2 pl-6 text-muted-foreground">
                        <li>NextAuth.js session cookies</li>
                        <li>Authentication state management</li>
                        <li>Security tokens</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-semibold">
                        Spotify Integration Cookies
                      </h4>
                      <p className="mt-8 text-foreground">
                        Set by Spotify to enable core functionality:
                      </p>
                      <ul className="list-decimal space-y-2 pl-6 text-muted-foreground">
                        <li>OAuth authentication tokens</li>
                        <li>Playlist access permissions</li>
                        <li>Playback device management</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="disclaimer">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-semibold">Disclaimers</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-xl font-semibold">
                      Service Availability
                    </h4>
                    <p className="mt-8 text-foreground">
                      While we strive to maintain consistent service, we cannot
                      guarantee uninterrupted access. Service quality depends
                      on:
                    </p>
                    <ul className="list-decimal space-y-2 pl-6 text-muted-foreground">
                      <li>Spotify's service availability</li>
                      <li>Your internet connection</li>
                      <li>Device compatibility</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-semibold">
                      Third-Party Services
                    </h4>
                    <p className="mt-8 text-foreground">
                      Our service relies on Spotify's API and services. We are
                      not responsible for:
                    </p>
                    <ul className="list-decimal space-y-2 pl-6 text-muted-foreground">
                      <li>Changes to Spotify's service or API</li>
                      <li>Spotify account issues or subscription status</li>
                      <li>Content availability on Spotify</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="w-full max-w-[400px] text-right md:max-w-[814px]">
            <p className="mt-2 inline text-xs text-muted-foreground">
              Need more information about our policies?{" "}
              <Link href="#" className="ml-2 text-primary underline">
                Contact Us
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;
