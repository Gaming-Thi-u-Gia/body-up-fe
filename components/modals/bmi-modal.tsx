"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useBmiModal } from "@/stores/use-bmi-model";
import { Button } from "../ui/button";
import { CardProgram } from "@/app/(main)/my-fitness-journey/card-program";

const data = {
    title: "2424 Summer Shred Challenge",
    releaseDate: "May 2424",
    days: "26",
    time: "40-60 min/day",
    type: "Weight Loss, Full Body, Abs & Core",
    equipment: "Fitness Mat",
};

export const BmiModal = () => {
    const [checkRadio, setCheckRadio] = useState("1");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [bmi, setBmi] = useState<number | null>(null);
    const [weightStatus, setWeightStatus] = useState("");

    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = useBmiModal();

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    const getWeightStatus = (bmiValue: number) => {
        if (bmiValue < 18.5) return "Underweight";
        if (bmiValue < 24.9) return "Normal weight";
        if (bmiValue < 29.9) return "Overweight";
        return "Obesity";
    };

    const calculateBmi = () => {
        let bmiValue = 0;
        if (checkRadio === "1") {
            const heightInMeters = Number(height) / 100;
            bmiValue = Number(weight) / (heightInMeters * heightInMeters);
        } else {
            const heightInInches = parseFloat(height) * 12 + parseFloat(height);
            bmiValue =
                (Number(weight) / (heightInInches * heightInInches)) * 703;
        }

        const roundedBmi = parseFloat(bmiValue.toFixed(1));
        setBmi(roundedBmi);
        setWeightStatus(getWeightStatus(roundedBmi));
    };

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="w-full">
                <DialogHeader>
                    <div className="flex items-center w-full mb-5 justify-center">
                        <h1 className="text-gray-900 font-bold text-4xl">
                            Calculate Your BMI
                        </h1>
                    </div>
                    <DialogTitle>
                        <div className="grid grid-cols-2 w-full gap-8 px-7 border border-solid bg-gray-200 rounded-md">
                            <div className="">
                                <span className="inline-block text-gray-900 font-semibold text-3xl py-4">
                                    Calculate Your BMI
                                </span>
                                <p className="text-[#868a93] font-normal text-[16px] leading-6">
                                    Gymatan unknown printer took lle type
                                    anscraey reteabled maketype area facilities
                                    specimen bookayurvived
                                </p>
                            </div>
                            <div>
                                <div className="flex gap-10 py-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            className="form-radio h-5 w-5 text-blue-600"
                                            name="radio"
                                            value="1"
                                            checked={checkRadio === "1"}
                                            onChange={(e) =>
                                                setCheckRadio(e.target.value)
                                            }
                                        />
                                        <span className="ml-2 text-gray-700">
                                            Metric Units
                                        </span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            className="form-radio h-5 w-5 text-blue-600"
                                            name="radio"
                                            value="2"
                                            checked={checkRadio === "2"}
                                            onChange={(e) =>
                                                setCheckRadio(e.target.value)
                                            }
                                        />
                                        <span className="ml-2 text-gray-700">
                                            Imperial Units
                                        </span>
                                    </label>
                                </div>
                                {checkRadio === "1" ? (
                                    <div className="flex gap-4 py-4">
                                        <input
                                            type="text"
                                            placeholder="Weight/kg"
                                            className="w-[50%] border border-[#000] rounded-md p-2"
                                            value={weight}
                                            onChange={(e) =>
                                                setWeight(e.target.value)
                                            }
                                        />
                                        <input
                                            type="text"
                                            placeholder="Height/cm"
                                            className="w-[50%] border border-[#000] rounded-md p-2"
                                            value={height}
                                            onChange={(e) =>
                                                setHeight(e.target.value)
                                            }
                                        />
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-3 gap-2 py-4">
                                        <input
                                            type="text"
                                            placeholder="Weight/lbs"
                                            className="border border-[#000] rounded-md p-2"
                                            value={weight}
                                            onChange={(e) =>
                                                setWeight(e.target.value)
                                            }
                                        />
                                        <input
                                            type="text"
                                            placeholder="Height/feet"
                                            className="border border-[#000] rounded-md p-2"
                                            value={height}
                                            onChange={(e) =>
                                                setHeight(e.target.value)
                                            }
                                        />
                                        <input
                                            type="text"
                                            placeholder="Height/inches"
                                            className="border border-[#000] rounded-md p-2"
                                            value={height}
                                            onChange={(e) =>
                                                setHeight(e.target.value)
                                            }
                                        />
                                    </div>
                                )}
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={calculateBmi}
                                >
                                    CALCULATE
                                </Button>
                                <div className="py-4">
                                    {bmi !== null && (
                                        <p className="text-[#868a93] text-[16px] font-normal">
                                            Your BMI is: {bmi}, and weight
                                            status is: {weightStatus}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </DialogTitle>
                </DialogHeader>

                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                        {bmi !== null ? (
                        <div className="transition-all ease-in duration-1000">
                            <h1 className="inline-block text-gray-900 font-semibold text-2xl py-5 pl-4">The type of workout program which is suitable for you is: {weightStatus}</h1>
                            <div className="grid grid-cols-4 pl-[20px]">
                            <CardProgram days={data.days}
                                                title={data.title}
                                                releaseDate={data.releaseDate}
                                                time={data.time}
                                                type={data.type}
                                                equipment={data.equipment}/>
                            <CardProgram days={data.days}
                                                title={data.title}
                                                releaseDate={data.releaseDate}
                                                time={data.time}
                                                type={data.type}
                                                equipment={data.equipment}/>
                            <CardProgram days={data.days}
                                                title={data.title}
                                                releaseDate={data.releaseDate}
                                                time={data.time}
                                                type={data.type}
                                                equipment={data.equipment}/>
                            <CardProgram days={data.days}
                                                title={data.title}
                                                releaseDate={data.releaseDate}
                                                time={data.time}
                                                type={data.type}
                                                equipment={data.equipment}/>
                            </div>
                        </div>
                        ) : (
                        <h1 className="transition-all ease-in duration-500 inline-block text-gray-900 font-semibold text-2xl py-5 pl-4">There is no suitable workout program for you</h1>
                        )}
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
