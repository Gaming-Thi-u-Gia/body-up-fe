import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/public/Logo_BodyUP.jpg";
import logo_web from "@/public/Logo_BODYUP.png";
const MarketingPage = () => {
    return (
        <div
            className="flex items-center justify-center"
            style={{ height: "calc(100vh - 128px)" }}
        >
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800">BODY UP!!!</h1>

                <div className="flex justify-center items-center">
                    <Image src={logo_web} width={250} height={250} alt="logo" />
                </div>
                <p className="text-gray-600 mt-2">
                    Rise Up with Body Up: Elevate Your Fitness, Energize Your
                    Life!
                </p>
                <Button variant="primary" size="lg" className="mt-4" asChild>
                    <Link href="/login">CONTINUE EXERCISE</Link>
                </Button>
            </div>
        </div>
    );
};

export default MarketingPage;
